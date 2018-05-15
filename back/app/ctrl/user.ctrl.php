<?php

namespace App\Controllers;

use App\Models\User;
use DateTime;

class UserController extends Controller
{

    public function listed($request, $response)
    {
        $users = User::all();
        $response->write(json_encode($users));
        return $response;
    }

    public function contact($request, $response)
    {
        $user = User::whereIn('id', explode(',', $request->getAttribute('id')))->get();
        $response->write(json_encode($user));
        return $response;
    }

    public function me($request, $response)
    {
        $me = User::find($this->container->me);
        $response->write(json_encode($me));
        return $response;
    }

    public function friends($request, $response)
    {
        $me = User::find($this->container->me);
        $friends = User::whereIn('id', explode(',', $me['friends']))->get();
        $response->write($friends->makeHidden('friends')->toJson());
        return $response;
    }
    public function makeFriend($request, $response)
    {
        $input = $request->getParsedBody();
        $idFriend = $input['id'];
        $me = User::find($this->container->me);
        $friend = User::find($idFriend);
        if (!$friend) {
            $response->write(json_encode($this->message['404']));
            return $response->withStatus(404);
        } else if($this->container->me == $idFriend){
            $response->write(json_encode($this->message['403']));
            return $response->withStatus(403);
        }
        $me->friends()->attach($idFriend, ['status' => '1']);

        $response->write(json_encode($this->message['200']));
        return $response;
    }

    public function create($request, $response)
    {
        $input = $request->getParsedBody();

        $user = User::create([
            'id' => $input['id'],
            'name' => $input['name'],
            'lat' => $input['lat'],
            'lng' => $input['lng'],
            'status' => $input['status'],
            'device' => $input['device'],
            'friends' => $input['friends']
        ]);
        /* push notification to all friends*/
        $this->pushNotification($input['friends'], NOTIFY_INSTANT, 1, CHANNEL_USER, $user['id'],MEAN_A_USER);

        $response->write(json_encode($this->message['200']));
        return $response;
    }

    public function update($request, $response)
    {
        $input = $request->getParsedBody();
        User::find($this->container->me)->update([
            'name' => $input['name'],
            'lat' => $input['lat'],
            'lng' => $input['lng'],
            'status' => $input['status'],
            'device' => $input['device'],
            'friends' => $input['friends']
        ]);

        $this->pushNotification($input['friends'], NOTIFY_INSTANT, 2, CHANNEL_USER, $this->container->me,MEAN_A_USER);

        $response->write(json_encode($this->message['200']));
        return $response;
    }
    public function ping($request, $response)
    {
        $input = $request->getParsedBody();
        User::find($this->container->me)->update([
            'lat' => $input['lat'],
            'lng' => $input['lng'],
            'device' => $input['device']
        ]);

        $this->pushNotification($input['friends'], NOTIFY_INSTANT, 3, CHANNEL_USER, $this->container->me,MEAN_A_USER);

        $response->write(json_encode($this->message['200']));
        return $response;
    }
    public function signOut($request, $response)
    {

        unset ($_SESSION['token']);
        unset ($_SESSION['user']);
        unset ($_SESSION['environment']);

        $me = User::find($this->container->me);
        $this->pushNotification($me['friends'], NOTIFY_INSTANT, 3, CHANNEL_USER, $this->container->me,MEAN_A_USER);

        $response->write(json_encode($this->message['200']));
        return $response;
    }

    public function pullNotifications($request, $response)
    {
        $notifications = User::find($this->container->me)->notifications()->limit(100)->get()->map(function ($i){
            return [
                'channel' => $i->channel,
                'template' => $i->template,
                'mention' => $this->readNotification($i->mention, $i->meaning),
                'status' => $i->status,
                'date' => $i->date->getTimestamp(),
            ];
        });
        $response->write($notifications->toJson());
        return $response;
    }
}
